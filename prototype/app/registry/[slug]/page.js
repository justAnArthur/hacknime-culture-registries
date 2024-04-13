'use client'

import { useRegisterContext } from '../../state'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from '@/components/ui/card'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { Label } from '@/components/ui/label'
import { Accordion, AccordionTrigger, AccordionContent, AccordionItem } from '@/components/ui/accordion'
import { useMemo } from 'react'

import { ImportModal } from './import'
import { AttributeTypeSelector } from './attributeType'
import Link from 'next/link'

import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'

import { Attribute, AttributeField } from './attributeType'

export default function ManagedRegister({ params: { slug } }) {
  const { attributes = [], events = [], published = [] } = useRegisterContext()[slug] || {}

  function onAdd(attribute) {
    console.log(attribute)
  }

  return <div className="flex flex-col gap-6">
    <div className="flex flex-col md:flex-row gap-[inherit]">
      {slug && <RegisterTable slug={slug} />}

      <div className="flex flex-col gap-[inherit] w-full md:w-[25rem]">
        <Card className="overflow-hidden">
          <Accordion type="single" collapsible>
            <AccordionItem value="some">
              <CardHeader className="pl-3 py-0">
                <AccordionTrigger>
                  <CardTitle>
                    {`Štruktúra` || <>
                      <Input placeholder="slug" />
                    </>}
                  </CardTitle>
                </AccordionTrigger>
              </CardHeader>
              <CardContent className="!p-0">
                <AccordionContent>
                  <Attribute onAdd={onAdd} attribute={{
                    name: 'root',
                    type: 'object',
                    innerAttributes: attributes
                  }} />
                </AccordionContent>
              </CardContent>
            </AccordionItem>
          </Accordion>
        </Card>

        <div className="flex flex-col gap-3">
          <Card>
            <CardHeader className="pl-3 py-3">
              <CardTitle>
                Publikované verzie
              </CardTitle>
            </CardHeader>
            <CardFooter className="pl-3 pb-3 border-t pt-2">
              Publikované je nastavené pri každom uložení (na požiadanie)
            </CardFooter>
          </Card>

          {published.map((published, index) => (
            <PublishedVersion key={index} version={published} />
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <Card>
            <CardHeader className="pl-3 py-3">
              <CardTitle>
                História zmien
              </CardTitle>
            </CardHeader>
          </Card>

          {events.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </div>
      </div>
    </div>
  </div >
}

const PublishedVersion = ({ version }) => {
  const date = useMemo(() => new Date(), [])

  return <Card className="overflow-hidden flex flex-col gap-3 p-3">
    <div className="flex flex-nowrap items-center justify-between gap-2">
      <code className="w-fit">
        {date.toLocaleDateString()}{' '}{'1:23:27 PM'}
      </code>

      <b className="text-xs">
        {version.user || 'Systémový administrátor'}
      </b>
    </div>
  </Card>
}

const EventCard = ({ event }) => {
  const date = useMemo(() => new Date(), [])

  return <Card className="overflow-hidden flex flex-col gap-3 p-3">
    <div className="flex flex-nowrap items-center justify-between gap-2">
      <code className="w-fit">
        {date.toLocaleDateString()}{' '}{'1:23:27 PM'}
      </code>

      <b className="text-xs">
        {event.user || 'Systémový administrátor'}
      </b>
    </div>
    <div className="flex items-start gap-2">
      <Badge>
        {event.type || 'Manuálne'}
      </Badge>
      <p className="whitespace-normal text-base">
        {event.description || 'Pridané nové pole: "Miesto podnikania" z hodnotou "Sample Miesto podnikania"'}
      </p>
    </div>
  </Card>
}

const RegisterTable = ({ slug }) => {
  const { data = [], name } = useRegisterContext()[slug] || {}

  return <Card className="overflow-hidden flex-1 h-fit">
    <CardHeader className="!p-3">
      <CardTitle className="flex flex-row justify-between items-center">
        {name}

        <div className="flex gap-2">
          <Link href={`/registry/${slug}/add`}>
            <Button type="button">
              Pridať nový záznam
            </Button>
          </Link>

          <ImportModal />
        </div>
      </CardTitle>
    </CardHeader>
    <CardContent className="divide-y divide-border !p-0">
      <Table>
        <TableHeader>
          <TableRow>
            {getAllKeys(data[0]).map((attribute) => (
              <TableHead key={attribute} className="whitespace-nowrap">
                {attribute.split('_').join(' ')}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...data, ...data, ...data, ...data, ...data].map((data, index) => (
            <TableRow key={index}>
              {getAllValues(data).map((value) => (
                <TableCell key={value} className="whitespace-no-wrap">
                  {value}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
}

function getAllKeys(obj) {
  let keys = [];
  for (let key in obj) {
    keys.push(key);
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      keys = keys.concat(getAllKeys(obj[key]));
    }
  }
  return keys;
}

function getAllValues(obj) {
  let values = [];
  for (let key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      values = values.concat(getAllValues(obj[key]));
    } else {
      values.push(obj[key]);
    }
  }
  return values;
}
