"use strict"
/*

    /assets/js/features/admin/renderer.js

*/
import { apiFetch } from '/assets/js/core/apiFetch.js'
import { qs, create } from '/assets/js/core/domhelper.js'

const BASE = '/api/admin/users'

/**
 * Liste paginée des utilisateurs.
 *
 * Retourne la réponse API complète :
 * {
 *     data: [],
 *     meta: {}
 * }
 */
async function fetchUsers({ page = 1, perPage = 20 } = {})
{
    const params = new URLSearchParams({
        page,
        per_page: perPage
    })

    const res = await apiFetch(`${BASE}?${params}`)

    if (!res.ok) {
        throw new Error(
            `fetchUsers HTTP ${res.status}`
        )
    }

    return res.json()
}

/**
 * Rend la liste des utilisateurs.
 */
function renderUsers(container, result)
{
    container.replaceChildren()

    //const users = result.data ?? []
    const users = result.data?.users ?? []
    const meta = result.data?.meta ?? {}    

    if (!users.length) {
        container.textContent = 'Aucun utilisateur.'
        return
    }

    const table = create('table')

    table.innerHTML = `
        <thead>
            <tr>
                <th>ID</th>
                <th>Utilisateur</th>
                <th>Email</th>
                <th>Actif</th>
            </tr>
        </thead>
        <tbody>
            ${users.map(user => `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.username ?? ''}</td>
                    <td>${user.email ?? ''}</td>
                    <td>${user.active ? 'Oui' : 'Non'}</td>
                </tr>
            `).join('')}
        </tbody>
    `

    container.appendChild(table)

    renderPager(container, meta)
}

/**
 * Affiche les informations de pagination.
 */
function renderPager(container, meta)
{
    if (!meta)
        return

    const pager = create('div')

    pager.className = 'users-pager'

    pager.textContent =
        `Page ${meta.page} / ${meta.pages} — ` +
        `${meta.total} utilisateur(s)`

    container.appendChild(pager)
}

/**
 * Initialisation du test Users.
 * 
 * 2026-10-15 :
 * - modifier selecteur #users-renderer en #art-admin-user-list
 */
export async function initUsersRenderer()
{
    const container = qs('#art-admin-user-list')

    if (!container)
        return

    container.textContent = 'Chargement...'

    try {
        const result = await fetchUsers()
        renderUsers(container, result)

    } catch (error) {
        console.error( 'Users renderer:', error)
        container.textContent ='Impossible de charger les utilisateurs.'
    }
}
