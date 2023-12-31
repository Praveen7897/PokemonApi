describe('test to check pokemon endpoint', () => {
  it('Should verify Maximum pokemon in the universe', () => {
    cy.request({
      method: 'Get',
      url: 'https://pokeapi.co/api/v2/pokemon/1026',
      failOnStatusCode: false,
    }).as('details')
    cy.get('@details').its('status').should('eq', 404)
  })

  it('Should verify Unknown pokemon  doesnt exist in the universe', () => {
    cy.request({
      method: 'Get',
      url: 'https://pokeapi.co/api/v2/pokemon/Pikaaachuuu',
      failOnStatusCode: false,
    }).as('details')
    cy.get('@details').its('status').should('eq', 404)
  })

  it('Should verify Uppercase pokemon name doesnt exist in the universe', () => {
    cy.request({
      method: 'Get',
      url: 'https://pokeapi.co/api/v2/pokemon/Pikachu',
      failOnStatusCode: false,
    }).as('details')
    cy.get('@details').its('status').should('eq', 404)
  })

  it('Should verify pokemon id starts from positive integer in the universe', () => {
    cy.request({
      method: 'Get',
      url: 'https://pokeapi.co/api/v2/pokemon/0',
      failOnStatusCode: false,
    }).as('details')
    cy.get('@details').its('status').should('eq', 404)
  })

  it('Should verify known pokemon exist in the universe', () => {
    cy.request({
      method: 'Get',
      url: 'https://pokeapi.co/api/v2/pokemon/pikachu',
      failOnStatusCode: false,
    }).as('details')
    cy.get('@details').its('status').should('eq', 200)
  })

  it('Should verify id of pokemon exist in the universe', () => {
    cy.request({
      method: 'Get',
      url: 'https://pokeapi.co/api/v2/pokemon/pikachu',
      failOnStatusCode: false,
    }).as('details')
    cy.get('@details').then((response) => {
      expect(response.body).to.have.property('id')
      expect(response.body.id).to.equal(25)
    })
  })

  it('should verify ability properties and value in the end point', () => {
    cy.request({
      method: 'Get',
      url: 'https://pokeapi.co/api/v2/pokemon/pikachu',
      failOnStatusCode: false,
    }).as('details')
    let property = ['ability', 'is_hidden']
    cy.get('@details').then((response) => {
      let key = JSON.parse(JSON.stringify(response.body.abilities))

      for (let i = 0; i < property.length; i++) {
        expect(key[i]).to.have.property(property[i])
      }
    })
  })

  it('should verify all properties in the end point', () => {
    cy.request({
      method: 'Get',
      url: 'https://pokeapi.co/api/v2/pokemon/pikachu',
      failOnStatusCode: false,
    }).as('details')
    let property = [
      'abilities',
      'base_experience',
      'forms',
      'game_indices',
      'height',
      'held_items',
      'id',
      'is_default',
      'location_area_encounters',
      'moves',
      'name',
      'order',
      'past_abilities',
      'past_types',
      'species',
      'sprites',
      'stats',
      'types',
      'weight',
    ]
    cy.get('@details').then((response) => {
      let key = JSON.parse(JSON.stringify(response.body))

      for (let i = 0; i < property.length; i++) {
        expect(key).to.have.property(property[i])
      }
    })
  })
})
