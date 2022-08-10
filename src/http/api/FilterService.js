import { $api, $apiget } from '@/http/api/index'

export default class FilterService {
	static async get(slug) {
		return $apiget.get('/filter/' + slug)
	}
}