export default class FetchData {
	mainUrl = 'https://test.kode-t.ru/';
	listPath = 'list.json';

	getData = async path => {
		const res = await fetch(this.mainUrl + path);

		if (!res.ok) {
			throw new Error(`Error: ${res.status}`);
		}

		return await res.json();
	};

	getList = async () => {
		return await this.getData(this.listPath);
	};

	getItem = async id => {
		return await this.getData(`detail_${id}.json`);
	};
}