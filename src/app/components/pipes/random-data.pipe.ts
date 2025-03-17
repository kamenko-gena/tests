import { KeyValue } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'randomData',
    pure: false,
    standalone: true,
})
export class RandomDataPipe implements PipeTransform {
    transform<T>(array: KeyValue<string, T>[] | null): KeyValue<string, T>[] {
        if (!array) return [];
        return array.slice().sort(() => Math.random() - 0.5);
    }
}
