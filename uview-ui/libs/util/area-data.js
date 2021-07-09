import { areaList } from "@sweet5/area-data";

const { province_list, city_list, county_list } = areaList;

const map = {};
for (const code in county_list) {
	const provinceCode = code.substr(0, 2);
	const cityCode = code.substr(0, 4);

	map[provinceCode] = map[provinceCode] || {};
	map[provinceCode][cityCode] = map[provinceCode][cityCode] || {};
	map[provinceCode][cityCode][code] = county_list[code];
}

const provinceArr = [];
const cityArr = [];
const areaArr = [];

for (const pCode in map) {
	const provinceName = province_list[pCode + "0000"];

	const cArr = [];
	const aArr = [];
	for (const cCode in map[pCode]) {
		const cityName = city_list[cCode + "00"];
		cArr.push({
			label: cityName,
			value: cCode,
		});

		const aaArr = [];
		for (const aCode in map[pCode][cCode]) {
			const areaName = county_list[aCode];
			aaArr.push({
				label: areaName,
				value: aCode,
			});
		}

		aArr.push(aaArr);
	}

	provinceArr.push({
		label: provinceName,
		value: pCode,
	});

	cityArr.push(cArr);
	areaArr.push(aArr);
}

export const provinces = provinceArr;
export const citys = cityArr;
export const areas = areaArr;