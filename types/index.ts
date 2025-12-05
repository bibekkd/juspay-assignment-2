import { LucideIcon } from 'lucide-react';

export interface MenuItem {
    id: string;
    label: string;
    description?: string;
    icon?: LucideIcon;
    href?: string;
    children?: MenuItem[];
}

export type MenuHistory = {
    title: string;
    items: MenuItem[];
};
