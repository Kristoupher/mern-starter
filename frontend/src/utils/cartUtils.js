//Fonction qui permet d'arrondir les prix à 2 décimales
export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
};

//Fonction qui permet de mettre à jour le panier
export const updateCart = (state) => {
    //     Calculer le prix des articles
    state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qtyChoose, 0));

    localStorage.setItem('cart', JSON.stringify(state));

    return state;
}