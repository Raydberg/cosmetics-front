import { Checkbox } from "./ui/checkbox"
import { Label } from "./ui/label"

export const FilterProducts = () => {
    return (
        <div className="min-h-svh ">
            <p>Filtros</p>

            <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                    <Checkbox id="styles" />
                    <Label htmlFor="styles">Belleza</Label>
                </div>
                <div className="flex items-start gap-2">
                    <Checkbox id="boys" defaultChecked />
                    <Label htmlFor="boys">Niños</Label>
                </div>
                <div className="flex items-start gap-2">
                    <Checkbox id="men" defaultChecked />
                    <Label htmlFor="men">Hombres</Label>
                </div>
                <div className="flex items-start gap-2">
                    <Checkbox id="woman" defaultChecked />
                    <Label htmlFor="woman">Mujeres</Label>
                </div>
            </div>
        </div>
    )
}
