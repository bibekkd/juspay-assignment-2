import {
    Home,
    Box,
    Building2,
    Users,
    BookOpen,
    HelpCircle,
    Lightbulb,
    Leaf,
    LineChart,
    Mail,
    Database,
    Cpu,
    BarChart,
    Zap,
    Server,
    Cloud,
    Shield,
    Smartphone
} from 'lucide-react';
import { MenuItem } from '@/types';
import { label } from 'framer-motion/client';

export const MENU_ITEMS: MenuItem[] = [
    {
        id: 'home',
        label: 'Home',
        description: 'Welcome to our comprehensive platform',
        icon: Home,
        href: '/',
    },
    {
        id: 'products',
        label: 'Products & Services',
        description: 'Explore our comprehensive offerings',
        icon: Box,
        children: [
            {
                id: 'data-strategy',
                label: 'Data Strategy',
                description: 'Data governance and strategy planning',
                icon: Database,
                children: [
                    {
                        id: 'data-governance',
                        label: 'Data Governance',
                        description: 'Data governance and strategy planning',
                        icon: Database,
                        children: [
                            {
                                id: 'data-strategy',
                                label: 'Data Strategy',
                                description: 'Data governance and strategy planning',
                                icon: Database,
                                href: '/products/data-strategy/data-strategy',
                            }
                        ],
                    },
                    {
                        id: 'data-strategy',
                        label: 'Data Strategy',
                        description: 'Data governance and strategy planning',
                        icon: Database,
                        children: [
                            {
                                id: 'data-strategy',
                                label: 'Data Strategy',
                                description: 'Data governance and strategy planning',
                                icon: Database,
                                href: '/products/data-strategy/data-strategy',
                            }
                        ],
                    }
                ],
            },
            {
                id: 'advanced-analytics',
                label: 'Advanced Analytics',
                description: 'Machine learning and predictive models',
                icon: Cpu,
                href: '/products/analytics',
            },
            {
                id: 'bi',
                label: 'Business Intelligence',
                description: 'BI platform implementation and reporting',
                icon: BarChart,
                href: '/products/bi',
            }
        ]
    },
    {
        id: 'solutions',
        label: 'Industry Solutions',
        description: 'Specialized solutions for different industries',
        icon: Building2,
        children: [
            {
                id: 'devops',
                label: 'DevOps Transformation',
                description: 'Organizational DevOps adoption and culture',
                icon: Zap,
                href: '/solutions/devops',
            },
            {
                id: 'platform',
                label: 'Platform Engineering',
                description: 'Internal developer platform development',
                icon: Server,
                href: '/solutions/platform',
            },
            {
                id: 'cloud',
                label: 'Cloud Migration',
                description: 'Cloud adoption and migration strategies',
                icon: Cloud,
                children: [{
                    id: 'cloud-migration',
                    label: 'Cloud Migration',
                    description: 'Cloud adoption and migration strategies',
                    icon: Cloud,
                    href: '/solutions/cloud',
                }]
            },
            {
                id: 'security',
                label: 'Cybersecurity',
                description: 'Enterprise-grade security solutions',
                icon: Shield,
                href: '/solutions/security',
            },
            {
                id: 'mobile',
                label: 'Mobile Development',
                description: 'Native and cross-platform mobile apps',
                icon: Smartphone,
                href: '/solutions/mobile',
            }
        ]
    },
    {
        id: 'company',
        label: 'Company',
        description: 'Learn about our organization and culture',
        icon: Users,
        href: '/company',
    },
    {
        id: 'resources',
        label: 'Resources',
        description: 'Knowledge base, tools, and learning materials',
        icon: BookOpen,
        href: '/resources',
    },
    {
        id: 'contact',
        label: 'Contact',
        description: 'Get in touch with our team',
        icon: Mail,
        href: '/contact',
    },
];