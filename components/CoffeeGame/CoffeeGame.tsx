'use client'

import React from 'react'
import styles from './styles.module.scss'
import CoffeeMachine from '../CoffeeMachine'
import Recipes from './Recipes'

const CoffeeGame: React.FC = () => {
 return (
    <section className={styles.coffeeMachine}>
      <CoffeeMachine/>
      <Recipes/>
    </section>
  )
}

export default CoffeeGame
