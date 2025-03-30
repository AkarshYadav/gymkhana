import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Product {
    _id: string;
    images: { url: string }[];
    title: string;
    intro: string;
    variant: string;
    price: number;
    discount: number;
    status?: string;
    stock: number;
}

export interface CartItem {
    product: Product;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    addItem: (product: Product, quantity?: number) => void;
    removeItem: (productId: string) => void;
    deleteCartProduct: (productId: string) => void;
    resetCart: () => void;
    getTotalPrice: () => number;
    getSubTotalPrice: () => number;
    getItemCount: (productId: string) => number;
    getGroupedItems: () => CartItem[];
    incrementQuantity: (productId: string) => void;
    decrementQuantity: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
}

const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            
            // Modified addItem to accept quantity parameter
            addItem: (product, quantity = 1) => set((state) => {
                const existingItem = state.items.find((item) => item.product._id === product._id);
                
                if (existingItem) {
                    // Calculate new quantity while respecting stock limits
                    const newQuantity = Math.min(
                        existingItem.quantity + quantity,
                        product.stock
                    );
                    
                    return {
                        items: state.items.map((item) =>
                            item.product._id === product._id
                                ? { ...item, quantity: newQuantity }
                                : item
                        ),
                    };
                } else {
                    // Add new item with specified quantity (capped at stock limit)
                    const newQuantity = Math.min(quantity, product.stock);
                    return { items: [...state.items, { product, quantity: newQuantity }] };
                }
            }),

            // New increment function
            incrementQuantity: (productId) => set((state) => {
                const item = state.items.find((item) => item.product._id === productId);
                if (!item || item.quantity >= item.product.stock) return state;
                return {
                    items: state.items.map((item) =>
                        item.product._id === productId
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                };
            }
        ),
            // New decrement function
            decrementQuantity: (productId) => set((state) => {
                const item = state.items.find((item) => item.product._id === productId);
                if (!item || item.quantity <= 1) return state;

                return {
                    items: state.items.map((item) =>
                        item.product._id === productId
                            ? { ...item, quantity: item.quantity - 1 }
                            : item
                    ),
                };
            }),
            // New update quantity function
            updateQuantity: (productId, quantity) => set((state) => {
                const item = state.items.find((item) => item.product._id === productId);
                if (!item) return state;

                const newQuantity = Math.max(1, Math.min(quantity, item.product.stock));
                
                return {
                    items: state.items.map((item) =>
                        item.product._id === productId
                            ? { ...item, quantity: newQuantity }
                            : item
                    ),
                };
            }),

            // Existing functions remain the same
            removeItem: (productId) => set((state) => {
                return {
                    items: state.items.reduce((acc, item) => {
                        if (item.product._id === productId) {
                            if (item.quantity > 1) {
                                acc.push({ ...item, quantity: item.quantity - 1 });
                            }
                        } else {
                            acc.push(item);
                        }
                        return acc;
                    }, [] as CartItem[]),
                };
            }),

            deleteCartProduct: (productId) =>
                set((state) => ({
                    items: state.items.filter((item) => item.product._id !== productId),
                })),

            resetCart: () => set(() => ({ items: [] })),

            getTotalPrice: () =>
                get().items.reduce(
                    (acc, item) => acc + item.product.price * item.quantity,
                    0
                ),

            getSubTotalPrice: () =>
                get().items.reduce((acc, item) => {
                    const discount = ((item.product.discount ?? 0)) ;
                    const discountPrice = discount;
                    return acc + discountPrice * item.quantity;
                }, 0),

            getItemCount: (productId) => {
                const item = get().items.find(
                    (item) => item.product._id === productId
                );
                return item ? item.quantity : 0;
            },

            getGroupedItems: () => get().items,
        }),
        { name: "cart-store" }
    )
);

export default useCartStore;