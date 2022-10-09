import { $api, $apiget } from '@/http/api/index'

export default class ProductService {
	static async get(params) {
		return $apiget.get('/product/', {
			params: params
		})
	}

    static async getByCategory(slug, params) {
		return  $apiget.get('/product/', {
			params: { category: slug, ...params }
		})
	}

	static async getOne(id) {
		return $apiget.get('/product/', {
			params: { id }
		})
	}
}
