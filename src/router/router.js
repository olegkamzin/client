import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage'
import ProductCategory from '@/pages/ProductCategory'
import ProductSingle from '@/pages/ProductSingle'

const routes = [
	{ path: '/', name: 'main', component: HomePage },
	{ path: '/:category', name: 'category', component: ProductCategory },
	{ path: '/:category/:id', name: 'single',  component: ProductSingle }
]
const router = createRouter({ routes, history: createWebHistory() })
export default router