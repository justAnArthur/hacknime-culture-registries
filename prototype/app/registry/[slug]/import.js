import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'


export const ImportModal = ({ }) => {

  return <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline">
        Importovať
      </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Vyberte zdroj importu</DialogTitle>
        <DialogDescription>
          Externý znamená register, ktorý je v inom externom systéme a vyberte z dostupných implementovaných importov.        </DialogDescription>
      </DialogHeader>
      <div className="grid grid-cols-2 gap-4 py-4">
        {['.csv', '.json', '.xml', 'Externý register'].map((format) => (
          <div className="grid place-content-center p-12 bg-gray-200 hover:bg-gray-300 rounded-lg whitespace-nowrap cursor-pointer">
            <Label>{format}</Label>
          </div>
        ))}
      </div>
      <DialogFooter>
        <Button type="submit">Importovať</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
}
