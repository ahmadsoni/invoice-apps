import { db } from "@/lib/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { products } from "@/data/products";

const addProductsToFirestore = async () => {
  try {
    for (const product of products) {
      const productRef = doc(collection(db, "products"), product.id);
      await setDoc(productRef, {
        id: product.id,
        name: product.name,
        basePrice: product.basePrice,
        image: product.image,
        category: product.category,
        description: product.description,
        thumbnails: product.thumbnails,
      });
      if (product.variants && product.variants.length > 0) {
        const variantsCollectionRef = collection(productRef, "variants");
        for (const variant of product.variants) {
          const variantRef = doc(variantsCollectionRef);
          await setDoc(variantRef, variant);
        }
      }
    }
    console.log("Produk berhasil ditambahkan ke Firestore!");
  } catch (error) {
    console.error("Gagal menambahkan produk ke Firestore:", error);
  }
};

addProductsToFirestore();
