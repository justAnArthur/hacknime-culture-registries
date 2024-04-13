import { Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export const AttributeTypeSelector = ({ onAdd, ...props }) => {

  return <Dialog>
    <DialogTrigger asChild>
      <Button {...props}>
        Add
      </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Zvoľte typ vstupu</DialogTitle>
      </DialogHeader>
      <div className="flex items-center space-x-2">
        <div className="grid grid-cols-2 grid-rows-2 gap-4 w-full">
          {
            [
              {
                name: "Text",
                description: "Textový vstup",
                icon: "Text",
                type: "text"
              },
              {
                name: "Number",
                description: "Číselný vstup",
                icon: "Text",
                type: "number"
              },
              {
                name: "Checkbox",
                description: "Checkbox",
                icon: "Text",
                type: "checkbox"
              },
              {
                name: "Date",
                description: "Dátum",
                icon: "Text",
                type: "date"
              }
            ].map((type) => (
              <div
                key={type.name}
                className="col-span-1 row-span-1 p-4 flex bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200"
              >
                <div className="flex flex-col space-y-2 p-2">
                  <p className="font-bold text-sm">{type.name}</p>
                  <p className="text-xs">{type.description}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>

      <div className="-mx-6 border-t"></div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <Checkbox />
          <Label>Povinné</Label>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox />
          <Label>Súkromné</Label>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox />
          <Label>Unikátne</Label>
        </div>

        <div className="space-y-2 col-span-2">
          <Label>Pomôcka pre pole</Label>

          <Input type="text" />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit" className="ml-auto">
          Uložiť
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
}

export const Attribute = ({ attribute, readOnly, onAdd }) => {
  function handleAdd() {
    onAdd(attribute)
  }

  if (attribute.name === 'root')
    return <div className="divide-y divide-border">
      {attribute.innerAttributes.map((innerAttribute) =>
        <Attribute key={innerAttribute.name} onAdd={onAdd} readOnly={readOnly} attribute={innerAttribute} />
      )}
      {!readOnly && <AttributeTypeSelector type="button" onAdd={handleAdd} className="rounded-none text-start justify-start w-full">
        add
      </AttributeTypeSelector>}
    </div>

  return <div className="min-w-[20rem]">
    <div className="flex items-center gap-4 p-2 justify-between">
      <h5>
        {attribute.name}
      </h5>
      {attribute.type && <code>
        {attribute.type}
      </code>}
    </div>

    {attribute.innerAttributes && <div className="border-t border-border pl-6">
      <div className="flex flex-col divide-y divide-border border-l border-border">
        {attribute.innerAttributes.map((innerAttribute) =>
          <Attribute key={innerAttribute.name} onAdd={onAdd} readOnly={readOnly} attribute={innerAttribute} />
        )}
        {!readOnly && <AttributeTypeSelector type="button" onAdd={handleAdd} className="rounded-none text-start justify-start">
          add
        </AttributeTypeSelector>}
      </div>
    </div>}
  </div>
}

export const AttributeField = ({ attribute }) => {
  if (attribute.name === 'root')
    return <div className="divide-y divide-border">
      {attribute.innerAttributes.map((innerAttribute) =>
        <AttributeField key={innerAttribute.name} attribute={innerAttribute} />
      )}
    </div>

  switch (attribute.type) {
    case "string":
      return <div className="p-3 min-w-[20rem] space-y-2">
        <div className="flex gap-3 items-center">
          <Label>{attribute.name}</Label>

          {attribute.hint &&
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" className="rounded-full w-5 h-5 relative">
                    <div className="absolute inset-0">
                      i
                    </div>
                  </Button>
                </TooltipTrigger>
                <TooltipContent align="start" className="max-w-sm">
                  <p className="text-xs">{attribute.hint}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>}

          {attribute.required && <Badge variant="destructive">Povinné</Badge>}
        </div>

        <Input type="text" />
      </div>
    case "number":
      return <div className="p-3 min-w-[20rem] space-y-2">
        <Label>{attribute.name}</Label>
        <Input type="number" />
      </div>
    case "boolean":
      return <div className="flex items-start gap-2 p-3 min-w-[20rem]">
        <Label>{attribute.name}</Label>
        <Input type="checkbox" className="w-4 h-4" />
      </div>
    case "date":
      return <Input type="date" placeholder={attribute.name} />
    case "array":
      return <div>
        <div className="p-2">
          <Label>{attribute.name}</Label>
        </div>

        <div className="pl-6 border-t border-border">
          <div className="border-l border-border divide-y divide-border">
            {attribute.innerAttributes.map((innerAttribute) =>
              <AttributeField key={innerAttribute.name} attribute={innerAttribute} />
            )}
          </div>
        </div>
      </div>
    case "object":
      return <div>
        <div className="p-2">
          <Label>{attribute.name}</Label>
        </div>

        <div className="pl-6 border-t border-border">
          <div className="border-l border-border divide-y divide-border">
            {attribute.innerAttributes.map((innerAttribute) =>
              <AttributeField key={innerAttribute.name} attribute={innerAttribute} />
            )}
          </div>
        </div>
      </div>
    default:
      return <div className="p-2">
        Unknown type
      </div>
  }
}
