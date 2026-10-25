// /assets/js/components/carousel.js
import { bus } from '/assets/js/core/eventBus.js'

class Carousel {

  constructor(rootNode) {
      this.root   = rootNode
      this.id     = rootNode.id
      this.images = Array.from(rootNode.querySelectorAll('img'))
      this.slides = []        // wrappers .cp_slide — cachés à l'init
      this.index  = 0

      // rAF
      this._rafId     = null
      this._lastTime  = null
      this._interval  = 2000  // ms entre chaque slide

      // IntersectionObserver — pause auto hors écran
      this._observer  = null
      this._visible   = false

      this._tick = this._tick.bind(this)

      this.setup()
      this._initObserver()
  }

  // ─── Setup ───────────────────────────────────────────────────────────────

  setup() {
      this.root.classList.add('cp_carousel-ready')

      this.images.forEach((img, i) => {
          const wrapper = img.closest('a') || img
          wrapper.classList.add('cp_slide')
          if (i === 0) wrapper.classList.add('active')
      })

      // Cache les wrappers une seule fois — plus de querySelectorAll à chaque tick
      this.slides = Array.from(this.root.querySelectorAll('.cp_slide'))
  }

  _initObserver() {
      this._observer = new IntersectionObserver(
          (entries) => {
              this._visible = entries[0].isIntersecting
              // Si le carousel redevient visible et qu'il était en cours → reprend
              if (this._visible && this._rafId !== null) {
                  this._lastTime = null // reset du timer pour éviter un saut
              }
          },
          { threshold: 0.1 }
      )
      this._observer.observe(this.root)
  }

  // ─── Boucle rAF ──────────────────────────────────────────────────────────

  _tick(timestamp) {
      if (!this._visible) {
          // Hors écran : on maintient la boucle active mais on ne touche pas au DOM
          this._rafId = requestAnimationFrame(this._tick)
          return
      }

      if (this._lastTime === null) {
          this._lastTime = timestamp
      }

      const elapsed = timestamp - this._lastTime

      if (elapsed >= this._interval) {
          this._lastTime = timestamp
          this._advance()
      }

      this._rafId = requestAnimationFrame(this._tick)
  }

  // ─── Navigation ──────────────────────────────────────────────────────────

  _advance() {
      this.show(this.index + 1)
  }

  show(index) {
      this.slides[this.index].classList.remove('active')
      this.index = ((index % this.slides.length) + this.slides.length) % this.slides.length
      this.slides[this.index].classList.add('active')
  }

  next() {
      this.show(this.index + 1)
  }

  prev() {
      this.show(this.index - 1)
  }

  // ─── Contrôle ────────────────────────────────────────────────────────────

  run(interval = 2000) {
      if (this._rafId !== null) return  // déjà en cours
      this._interval  = interval
      this._lastTime  = null
      this._rafId     = requestAnimationFrame(this._tick)
  }

  stop() {
      if (this._rafId !== null) {
          cancelAnimationFrame(this._rafId)
          this._rafId    = null
          this._lastTime = null
      }
  }

  // ─── Modes d'affichage ───────────────────────────────────────────────────

  colmin() {
      this.stop()
      this.root.style.display       = 'flex'
      this.root.style.flexDirection = 'column'
      // On rend tous les wrappers visibles (pas les <img> bruts)
      this.slides.forEach(slide => {
          slide.style.position = 'relative'
          slide.style.display  = 'block'
      })
  }

  // ─── Destroy ─────────────────────────────────────────────────────────────

  destroy() {
      this.stop()
      if (this._observer) {
          this._observer.disconnect()
          this._observer = null
      }
      this.root.innerHTML = ''
      this.slides = []
      this.images = []
  }

}



class CarouselManager {

    constructor() {
        this.carousels = new Map()
        this._registerEvents()
    }

    // ─── Init ─────────────────────────────────────────────────────────────────

    init() {
        const nodes = document.querySelectorAll('.cp_carousel')

        nodes.forEach(node => {
            const instance = new Carousel(node)
            this.carousels.set(instance.id, instance)
        })

        console.log(`CarouselManager: ${this.carousels.size} instance(s) enregistrée(s)`)
    }

    // ─── Accès ────────────────────────────────────────────────────────────────

    getById(idSuffix) {
        return this.carousels.get('CAROUSEL_' + idSuffix) ?? null
    }

    destroy(idSuffix) {
        const carousel = this.getById(idSuffix)
        if (!carousel) return
        carousel.destroy()
        this.carousels.delete('CAROUSEL_' + idSuffix)
    }

    // ─── Bus events ───────────────────────────────────────────────────────────

    _registerEvents() {

        // Lancer un carousel (optionnel : intervalle en ms en 2e arg)
        // bus.publish('carousel:run', '1')
        // bus.publish('carousel:run', { id: '1', interval: 3000 })
        bus.subscribe('carousel:run', (payload) => {
            const { id, interval } = this._parsePayload(payload)
            const carousel = this.getById(id)
            if (!carousel) return
            carousel.run(interval)
        })

        // Stopper un carousel
        bus.subscribe('carousel:stop', (idSuffix) => {
            this.getById(idSuffix)?.stop()
        })

        // Slide suivante (manuellement)
        bus.subscribe('carousel:next', (idSuffix) => {
            this.getById(idSuffix)?.next()
        })

        // Slide précédente (manuellement)
        bus.subscribe('carousel:prev', (idSuffix) => {
            this.getById(idSuffix)?.prev()
        })

        // Aller à un index précis
        bus.subscribe('carousel:goto', ({ id, index }) => {
            this.getById(id)?.show(index)
        })

        // Mode colonne (toutes les slides empilées)
        bus.subscribe('carousel:colmin', (idSuffix) => {
            this.getById(idSuffix)?.colmin()
        })

        // Longueur d'un carousel (debug)
        bus.subscribe('carousel:glen', (idSuffix) => {
            const carousel = this.getById(idSuffix)
            if (!carousel) return
            console.log(`Carousel ${carousel.id} → ${carousel.slides.length} slide(s)`)
        })

        // Actions globales
        bus.subscribe('carousel:run:all', (interval) => {
            this.carousels.forEach(c => c.run(interval))
        })

        bus.subscribe('carousel:stop:all', () => {
            this.carousels.forEach(c => c.stop())
        })

    }

    // ─── Helpers ──────────────────────────────────────────────────────────────

    // Accepte une string simple '1' ou un objet { id, interval }
    _parsePayload(payload) {
        if (typeof payload === 'string') return { id: payload, interval: 2000 }
        return { id: payload.id, interval: payload.interval ?? 2000 }
    }

}

//export const carouselManager = new CarouselManager()

//--------------------------------------------
export function initCarousel() {
    console.log('-- initCarousel --')
    
    const carouselManager = new CarouselManager()
    carouselManager.init()

}
