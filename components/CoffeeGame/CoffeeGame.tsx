'use client'

import React from 'react'
import styles from './styles.module.scss'
import CoffeeMachine from './CoffeeMachine/CoffeeMachine'
import Recipes from './Recipes/Recipes'
import Ingredients from './Ingredients/Ingredients'

const CoffeeGame: React.FC = () => {
 
  return (
    <section className={styles.coffeeMachine}>
      <CoffeeMachine/>
      <Recipes/>
      

    </section>
  )
}

export default CoffeeGame
