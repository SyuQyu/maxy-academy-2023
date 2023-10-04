const DATA_COUNT = 7;
const NUMBER_CFG = { count: DATA_COUNT, min: -100, max: 100 };

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
const data = {
    labels: labels,
    datasets: [
        {
            label: 'Fully Rounded',
            data: [12, -30, 20, -45, 30, -20, 40],
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            borderWidth: 2,
            borderRadius: Number.MAX_VALUE,
            borderSkipped: false,
        },
        {
            label: 'Small Radius',
            data: [-10, 40, -15, 35, -25, 45, -30],
            borderColor: 'blue',
            backgroundColor: 'rgba(0, 0, 255, 0.5)',
            borderWidth: 2,
            borderRadius: 5,
            borderSkipped: false,
        }
    ]
};

const config = {
    type: 'bar',
    data: data,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Bar Chart'
            }
        }
    },
};

const ctx = document.getElementById('myChart').getContext('2d');
new Chart(ctx, config);