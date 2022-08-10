const media = 'https://media.shinpi.ru/'

export default class GetImages {
	static preview(img) {
		return media + '200/' + img
	}

	static previewX2(img) {
		return media + '400/' + img
	}

	static medium(img) {
		return media + '800/' + img
	}

	static null(img) {
		return media + 'null/' + img
	}
}