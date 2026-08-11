import { Injectable, computed, signal } from '@angular/core';
import { User } from '@supabase/supabase-js';
import { SupabaseService } from './supabase.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private supabaseService: SupabaseService) {
        this.supabaseService.client.auth.getSession().then(({ data }) => {
            this.currentUser.set(data.session?.user ?? null);
        });
    }
    currentUser = signal<User | null>(null);
    userIsLoggedIn = computed(() => this.currentUser() !== null);

    async signUp(name: string, email: string, password: string) {
        const { data, error } = await this.supabaseService.client.auth.signUp({
            email,
            password,
            options: {
                data: { name }
            },
        });
        if (error) throw error;
        this.currentUser.set(data.user);
        return data.user;
    }
    async signIn(email: string, password: string) {
        const { data, error } = await this.supabaseService.client.auth.signInWithPassword({
            email,
            password,
        });
        if (error) throw error;
        this.currentUser.set(data.user);
        return data.user;
    }
    async signOut() {
        const { error } = await this.supabaseService.client.auth.signOut();
        if (error) throw error;
        this.currentUser.set(null);
        console.log('a')
    }
}