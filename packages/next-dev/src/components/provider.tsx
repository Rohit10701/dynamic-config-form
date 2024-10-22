"use client"
import React, { ReactNode } from 'react'
import { FormProvider } from '../components/src/index'

const Provider = ({children }: {children : ReactNode}) => {
  return (
    <div>
        <FormProvider >
            {children}
        </FormProvider>
    </div>
  )
}

export default Provider