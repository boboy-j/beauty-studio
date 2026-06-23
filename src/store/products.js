import { defineStore } from 'pinia'
import { products as seedProducts } from '@/mock/data.js'

let nextId = seedProducts.reduce((max, p) => Math.max(max, p.id), 0) + 1

export const useProductsStore = defineStore('products', {
  state: () => ({
    // 深拷贝初始数据，后续修改不影响 mock 源
    items: seedProducts.map(p => ({ ...p, images: [...p.images], tags: [...p.tags], items: p.items.map(i => ({ ...i })) })),
  }),

  getters: {
    activeProducts: (state) => state.items.filter(p => p.isActive),
    getProductById: (state) => (id) => state.items.find(p => p.id === Number(id)),
  },

  actions: {
    addProduct(product) {
      const newProduct = {
        ...product,
        id: nextId++,
        images: product.images || [],
        sales: 0,
        isActive: true,
        createdAt: new Date().toISOString(),
      }
      this.items.push(newProduct)
      return newProduct
    },

    updateProduct(id, updates) {
      const idx = this.items.findIndex(p => p.id === Number(id))
      if (idx === -1) return false
      Object.assign(this.items[idx], updates)
      return true
    },

    deleteProduct(id) {
      const idx = this.items.findIndex(p => p.id === Number(id))
      if (idx === -1) return false
      this.items.splice(idx, 1)
      return true
    },

    toggleProductStatus(id) {
      const product = this.items.find(p => p.id === Number(id))
      if (!product) return false
      product.isActive = !product.isActive
      return product.isActive
    },
  },
})
