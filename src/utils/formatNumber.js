export const formatNumberWithTwoDecimalPlace = (num) => {
    return num ? Number(num).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : null
};