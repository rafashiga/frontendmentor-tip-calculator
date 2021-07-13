const inputPeople = document.getElementsByName('people')[0];
const inputBill = document.getElementsByName('bill')[0];
const radioTip = document.getElementsByName('tip');
const inputTipCustom = document.getElementsByName('tip_custom')[0];
const btnReset = document.getElementById('btnReset');

const tipAmount = document.getElementById('tip-amount');
const total = document.getElementById('total');

let inputBillValue = 0;
let inputPeopleValue = 0;
let tipValue = 0;

function checkInputEmpty(inputValue, id, input) {
	if (inputValue) {
		input.classList.remove('input--warning');
		document.getElementById(id).style.visibility = 'hidden';
	} else {
		input.classList.add('input--warning');
		document.getElementById(id).style.visibility = 'visible';
	}
}

function calcTotal() {
	if (inputPeopleValue) {
		const billPerson = inputBillValue / inputPeopleValue;
		const tipAmountValue = billPerson * tipValue;
		tipAmount.textContent = currencyFormatter.format(tipAmountValue);
		total.textContent = currencyFormatter.format(billPerson + tipAmountValue);
	}
}

function uncheckedTipRadio() {
	radioTip.forEach((radio) => (radio.checked = false));
}

const currencyFormatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
});

inputBill.addEventListener('blur', (input) => {
	const value = input.target.value;
	inputBillValue = value.length ? value : 0;

	checkInputEmpty(inputBillValue, 'input-bill-warning', inputBill);

	calcTotal();
});

inputPeople.addEventListener('blur', (input) => {
	const value = input.target.value;
	inputPeopleValue = value.length ? value : 0;

	checkInputEmpty(inputPeopleValue, 'input-people-warning', inputPeople);

	calcTotal();
});

radioTip.forEach((option) => {
	option.addEventListener('click', () => {
		inputTipCustom.value = '';
		tipValue = option.value / 100;

		calcTotal();
	});
});

inputTipCustom.addEventListener('blur', (input) => {
	uncheckedTipRadio();
	const value = input.target.value;
	tipValue = value.length ? value / 100 : 0;

	calcTotal();
});

btnReset.addEventListener('click', () => {
	inputBill.value = '';
	inputPeople.value = '';
	inputTipCustom.value = '';
	inputBillValue = 0;
	inputPeopleValue = 0;
	tipValue = 0;
	uncheckedTipRadio();

	tipAmount.textContent = '$0.00';
	total.textContent = '$0.00';
});
