'use client'

import React from 'react'
import CoffeeMachine from '../CoffeeMachine'
import Recipes from './Recipes'

const CoffeeGame: React.FC = () => {
 return (
    <section className="w-full h-full flex justify-center items-center font-roboto text-base text-[#333] p-5 box-border bg-[#fff4d3] text-center overflow-hidden">
      <CoffeeMachine/>
      <Recipes/>
    </section>
  )
}

export default CoffeeGame
