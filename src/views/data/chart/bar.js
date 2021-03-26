export default function getData() {
    return {

        chart: {
            type: 'column'
        },
        title: {
            text: ''
        },
        xAxis: {
            type: 'category',
                labels: {
                rotation: -45,
                    style: {
                    fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
                title: {
                text: 'Rata rata (persen)'
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: 'Jumlah: <b>{point.y:.1f} persen</b>'
        },
        series: [{
            name: 'Population',
            data: [
                ['Cimahi', 24.2],
                ['Kab Bandung', 20.8],
                ['Kab Bandung Barat', 14.9],
                ['Kab Bekasi', 13.7],
                ['Kab Bogor', 13.1],
                ['Kab Ciamis', 12.7],
                ['Kab Cianjur', 12.4],
                ['Kab Cirebon', 12.2],
                ['Kab Garut', 12.0],
                ['Kab Indramayu', 11.7],
                ['Kab Karawang', 11.5],
                ['Kab Kuningan', 11.2],
                ['Kab Majalengka', 11.1],
                ['Kab Pangandaran', 10.6],
                ['Kab Purwakarta', 10.6],
                ['Kab Subang', 10.6],
                ['Kab Sukabumi', 10.3],
                ['Kab Sumedang', 9.8],
                ['Kab Tasikmalaya', 9.3],
                ['Kota Bandung', 9.3],
                ['Kota Banjar', 9.3],
                ['Kota Bekasi', 9.3],
                ['Kota Bogor', 9.3],
                ['Kota Cirebon', 9.3],
                ['Kota Depok', 9.3],
                ['Kota Sukabumi', 9.3],
                ['Kota Tasikmalaya', 9.3],
            ],
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                format: '{point.y:.1f}', // one decimal
                y: 10, // 10 pixels down from the top
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        }]
        
    }
}
