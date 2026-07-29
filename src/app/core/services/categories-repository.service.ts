import { Injectable } from '@angular/core';
import { CategoryInterface, CategoryRow } from '../models/category.model';
import { SupabaseService } from './supabase.service';

@Injectable({ providedIn: 'root' })

export class CategoriesRepository {
    constructor(private supabaseService: SupabaseService) { }
    private mapToCategory(row: CategoryRow): CategoryInterface {
        return {
            id: row.id,
            name: row.name,
            percentage: row.percentage,
            isLocked: row.locked,
            assignedAmount: row.assigned_amount,
            iconName: row.icon_name,
        };
    }
    private mapToRow(changes: Partial<CategoryInterface>): Partial<CategoryRow> {
        const row: Partial<CategoryRow> = {};
        if (changes.name !== undefined) {
            row.name = changes.name
        };
        if (changes.percentage !== undefined) {
            row.percentage = changes.percentage
        };
        if (changes.isLocked !== undefined) {
            row.locked = changes.isLocked
        };
        if (changes.assignedAmount !== undefined) {
            row.assigned_amount = changes.assignedAmount
        };
        if (changes.iconName !== undefined) {
            row.icon_name = changes.iconName
        };
        return row;
    }
    async getAll(): Promise<CategoryInterface[]> {
        const { data, error } = await this.supabaseService.client
            .from('categories')
            .select('*');
        if (error) throw error;
        return (data ?? []).map((row: CategoryRow) => this.mapToCategory(row));
    }
    async create(category: Omit<CategoryInterface, 'id'>): Promise<CategoryInterface> {
        const { data, error } = await this.supabaseService.client
            .from('categories')
            .insert({
                name: category.name,
                percentage: category.percentage,
                locked: category.isLocked,
                assigned_amount: category.assignedAmount,
                icon_name: category.iconName,
            })
            .select()
            .single()

        if (error) throw error;
        return this.mapToCategory(data as CategoryRow);
    }
    async update(changes: Partial<CategoryInterface>, id: string): Promise<CategoryInterface> {
        const { data, error } = await this.supabaseService.client
            .from('categories')
            .update(this.mapToRow(changes))
            .eq('id', id)
            .select()
            .single()
        if (error) throw error;
        return this.mapToCategory(data as CategoryRow);
    }
    async delete(id: string): Promise<void> {
        const { error } = await this.supabaseService.client
            .from('categories')
            .delete()
            .eq('id', id)
        if (error) throw error;
    }
}