const BASE_URL = "https://makeup-api.herokuapp.com/api/v1/products.json";

/**
 * Busca produtos da Makeup API
 * @param {string} productType ex: lipstick, foundation, mascara
 * @param {string} brand ex: nyx, maybelline
 */
export async function fetchMakeupProducts(
    productType = "mascara",
    brand = "nyx"
    ) {
    const url = productType && productType !== "all"
        ? `${BASE_URL}?product_type=${productType}&brand=${brand}`
        : `${BASE_URL}?brand=${brand}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Erro ao buscar produtos");
    }

    const data = await response.json();

    return data
        .filter(
        (item) =>
            item.brand?.toLowerCase() === brand.toLowerCase() &&
            item.image_link &&
            item.image_link.startsWith("http")
        )
        .slice(0, 8)
        .map((item) => ({
        id: item.id,
        brand: item.brand.toUpperCase(),
        name: item.name,
        price: item.price ? Number(item.price).toFixed(2) : "0.00",
        img: item.image_link,
        }));
}
