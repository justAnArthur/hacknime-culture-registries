'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

import { Attribute, AttributeField } from '../attributeType'

import { useRegisterContext } from '../../../state'

export default function AddNewToRegistry({ params: { slug } }) {
  const { attributes = [] } = useRegisterContext()[slug] || {}

  return <div className="flex flex-col gap-6">
    <div className="flex flex-col md:flex-row gap-[inherit]">
      <Card>
        <CardHeader className="pl-3 py-3">
          <CardTitle>
            Ručné vytvorenie nového záznamu
          </CardTitle>
        </CardHeader>
        <CardContent className="!p-0">
          <AttributeField attribute={{
            name: 'root',
            type: 'object',
            innerAttributes: attributes
          }} />
        </CardContent>
      </Card>

      <div className="flex flex-col gap-[inherit] w-full md:w-[25rem]">
        <Card>
          <CardHeader className="pl-3 py-3">
            <CardTitle>
              Možné konflikty z existujúcich záznamy
            </CardTitle>
          </CardHeader>
          <CardContent className="pl-3 pt-2 pb-3 border-t">
            <p>
              Nie sú žiadne konflikty
            </p>
          </CardContent>
        </Card>
      </div>
    </div>

    <Button type="button" className="ml-auto max-w-[20rem]">
      Odovzdať
    </Button>
  </div>
}
