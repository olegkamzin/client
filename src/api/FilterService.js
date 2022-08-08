import { $api, $apiget } from '@/api'

export default class FilterService {
	static async get(slug) {
		return $apiget.get('/filter/' + slug)
	}
}