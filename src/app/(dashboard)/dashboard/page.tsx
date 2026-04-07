import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useQuery } from 'convex/react'
import React from 'react'
import { api } from '../../../../convex/_generated/api'

function page() {

 

  return (
    <div>
      <div className='w-full dvh-screen flex flex-col gap-y-10'>
        
        <Card className='w-full'>
          <CardHeader>
            <h1 className='text-2xl font-bold'>Pendentes de Aprovação</h1>
          </CardHeader>
          <CardContent>
            <p>sem aprovações pendentes</p>
          </CardContent>
        </Card>

        <Card className='w-full'>
          <CardHeader>
            <h1 className='text-2xl font-bold'>Funcionários Ativos</h1>
          </CardHeader>
          <CardContent>
            <p>Em construção...</p>
          </CardContent>
        </Card>

        <Card className='w-full'>
          <CardHeader>
            <h1 className='text-2xl font-bold'>Correções Abertas</h1>
          </CardHeader>
          <CardContent>
            <p>Em construção...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default page