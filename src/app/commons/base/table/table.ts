import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { GenericT } from "../../model/generic-t";

@Component({
    standalone: true,
    template: ''
})
export abstract class Table<T extends GenericT> implements OnChanges {

    @Input()
    public list: T[] = [];
    @Output()
    protected selectedValuesEmitter: EventEmitter<number[]> = new EventEmitter<number[]>();
    protected selectedValues: number[] = [];

    ngOnChanges(changes: SimpleChanges): void {
        this.list = changes['list'].currentValue;
        this.selectedValues = [];
    }
    selectAll(): void {
        if (this.selectedValues.length === this.list.length) {
            this.selectedValues = [];
        } else {
            this.list.forEach((item) => {
                if (this.selectedValues.includes(item.id!)) {
                    return;
                } else {
                    this.selectedValues.push(item.id!);
                }
            });
        }
        this.emitterSelectedVehicles();
    }

    selectOne(id: number): void {
        if (this.selectedValues.includes(id)) {
            this.selectedValues.splice(this.selectedValues.indexOf(id), 1);
        } else {
            this.selectedValues.push(id);
        }
        this.emitterSelectedVehicles();
    }

    private emitterSelectedVehicles(): void {
        this.selectedValuesEmitter.emit(this.selectedValues);
    }
}
