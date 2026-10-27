// js/features/auth/user.renderer.js

import { bus }       from '/assets/js/core/eventBus.js'
import { byId, byName , qs , qsa , create } from '/assets/js/core/domhelper.js'
import { authStore } from '/assets/js/features/auth/auth.store.js'



export class UserPanel{


    constructor( divUserBoard ){
        
        this.el = divUserBoard

    }

    render(){
        console.log(`Render in ${this.el}`)
    }

    destroy(){
        this.el = null
    }
    

}


export class MotPanel{


    constructor( divMotBoard ){
        
        this.el = byId(divMotBoard)

        this._onSelect = null

    }

    // onSelect est
    onSelect(fn) { this._onSelect = fn }


    render(){
        const p1 = create('p', { text: 'Paragraphe 1 créé dynamiquement .' })

        const btn = create(
            'button',
            { 
                type: 'button',
                class: '.primary-button'
            }, 
            { 
                click: () => 
                    { 
                        const fldPhone1_value = qs('input[name="fieldPhone"]', fldPhone1 ).value
                        const fldTxt1_value = qs('input[name="fieldText1"]', fldTxt1 ).value
                        const fldTxt2_value = qs('input[name="fieldText2"]', fldTxt2 ).value
                        const c = { formName: 'test1' , phone: fldPhone1_value , txt1: fldTxt1_value , txt2 : fldTxt2_value }
                        this._onSelect( fldPhone1_value )



                    }
            }
        )

        btn.append(
            create('i',    { class: 'fa fa-fw fa-envelope' }),
            create('span', { text: 'Envoyer le lien' }),
        )
                
        const fldPhone1 = fieldPhone()
        const fldTxt1 = fieldText('fieldText1')
        const fldTxt2 = fieldText('fieldText2')                
        /*
        fonctione aussi mais on a ajouter event dans create 
        btn.addEventListener('click', () => { 
            const iv = qs('input[name="fieldPhone"]', fldPhone1 )
            this._onSelect( iv.value )
        })
        */










        const p2 = create('p', { text: 'Paragraphe 2 créé dynamiquement .' })
//fetchMot

        const btn2 = create(
            'button',
            { 
                type: 'button',
                class: '.primary-button'
            }, 
            { 
                click: () => 
                    { 
                        const fldTxt3_value = qs('input[name="fieldText3"]', fldTxt3 ).value
                        const c = { formName: 'test2' , q : fldTxt3_value }
                        this._onSelect( c )
                    }
            }
        )

        btn2.append(
            create('i',    { class: 'fa fa-fw fa-file-text-o' }),
            create('span', { text: 'Rechercher' }),
        )


        const fldTxt3 = fieldText('fieldText3')


        this.el.appendChild(p1)
        this.el.appendChild(fldPhone1)
        this.el.appendChild(fldTxt1)
        this.el.appendChild(fldTxt2)
        this.el.appendChild(btn)
        
        this.el.appendChild(p2)
        this.el.appendChild(fldTxt3)
        this.el.appendChild(btn2)

        console.log(`Render in ${this.el}`)
    }





    destroy(){
        this._onSelect = null

        this.el = null
        
    }
    

}

/*améliorer

passer arguments
- text 
- name
- french / internationnale  / american etc...

recherche regex 
"[0-9]{10}"
*/

const fields_phone_label = "Numéro de téléphone"
const fields_phone_name = "fieldPhone"
const fields_phone_placeholder = "Saisir un numéro de téléphone"
const fields_phone_pattern = "[0-9]{10}"
const fields_phone_size = 10

function fieldPhone( l = fields_phone_label , n = fields_phone_name , ph =  fields_phone_placeholder , p = fields_phone_pattern , s = fields_phone_size){
    let label  = create('label')
    label.innerText = l

    const inputPhone = create( 'input', { type: 'tel', name: n , placeholder: ph , pattern : p , size : s } )

    label.appendChild(inputPhone)
    return label
}


const fields_text_label = "Texte"
const fields_text_name = "fieldText"
const fields_text_placeholder = "Saisir un texte"
//const fields_text_pattern = "[0-9]{10}"
const fields_text_size = 20

function fieldText( n = fields_text_name , l = fields_text_label ,  ph =  fields_text_placeholder , s = fields_text_size){
    let label  = create('label')
    label.innerText = l

    const inputText = create( 'input', { type: 'text', name: n , placeholder: ph , size : s } )

    label.appendChild(inputText)
    return label
}





