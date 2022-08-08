import { $api, $apiget } from '@/api'

export default class ProductService {
	static async get(params) {
		return $apiget.get('/product/', {
			params: params
		})
	}

    static async getByCategory(slug, params) {
		return  $apiget.get('/product/' + slug, {
			params: params
		})
	}

	static async getOne(id) {
		return $apiget.get('/product/single/' + id)
	}
}