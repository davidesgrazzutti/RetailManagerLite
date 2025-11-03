import React, { useEffect, useState } from "react";
import { Product } from "./models/Product";
import { getProducts, createProduct, updateProduct, deleteProduct } from "./services/ProductService";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [sortField, setSortField] = useState<keyof Product>("id");
  const [sortAsc, setSortAsc] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Errore nel recupero prodotti:", error);
    }
  };

  const handleAdd = async () => {
    if (!name) return;
    try {
      await createProduct({ name, category, price, quantity });
      setName(""); setCategory(""); setPrice(0); setQuantity(0);
      fetchProducts();
    } catch (error) {
      console.error("Errore nell'aggiunta prodotto:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (error) {
      console.error("Errore nell'eliminazione prodotto:", error);
    }
  };

  const handleEdit = async (product: Product, field: keyof Product, value: string | number) => {
    const updated = { ...product, [field]: value };
    try {
      await updateProduct(updated);
      fetchProducts();
    } catch (error) {
      console.error("Errore nell'aggiornamento prodotto:", error);
    }
  };

  const handleSort = (field: keyof Product) => {
    if (sortField === field) setSortAsc(!sortAsc);
    else {
      setSortField(field);
      setSortAsc(true);
    }
    const sorted = [...products].sort((a, b) => {
      if (a[field] < b[field]) return sortAsc ? -1 : 1;
      if (a[field] > b[field]) return sortAsc ? 1 : -1;
      return 0;
    });
    setProducts(sorted);
  };

  const filteredProducts = products.filter(
    p => p.name.toLowerCase().includes(search.toLowerCase()) ||
         p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Retail Manager Lite</h1>

      {/* Ricerca */}
      <div className="mb-3">
        <input
          className="form-control"
          placeholder="Cerca per nome o categoria"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Form Aggiungi */}
      <div className="mb-4 row g-2">
        <div className="col"><input className="form-control" placeholder="Nome" value={name} onChange={e => setName(e.target.value)} /></div>
        <div className="col"><input className="form-control" placeholder="Categoria" value={category} onChange={e => setCategory(e.target.value)} /></div>
        <div className="col"><input type="number" className="form-control" placeholder="Prezzo" value={price} onChange={e => setPrice(+e.target.value)} /></div>
        <div className="col"><input type="number" className="form-control" placeholder="Quantità" value={quantity} onChange={e => setQuantity(+e.target.value)} /></div>
        <div className="col-auto"><button className="btn btn-primary" onClick={handleAdd}>Aggiungi</button></div>
      </div>

      {/* Tabella prodotti */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th onClick={() => handleSort("id")} style={{ cursor: "pointer" }}>ID</th>
            <th onClick={() => handleSort("name")} style={{ cursor: "pointer" }}>Nome</th>
            <th onClick={() => handleSort("category")} style={{ cursor: "pointer" }}>Categoria</th>
            <th onClick={() => handleSort("price")} style={{ cursor: "pointer" }}>Prezzo</th>
            <th onClick={() => handleSort("quantity")} style={{ cursor: "pointer" }}>Quantità</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>
                <input
                  className="form-control"
                  value={p.name}
                  onChange={e => handleEdit(p, "name", e.target.value)}
                />
              </td>
              <td>
                <input
                  className="form-control"
                  value={p.category}
                  onChange={e => handleEdit(p, "category", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  value={p.price}
                  onChange={e => handleEdit(p, "price", +e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  value={p.quantity}
                  onChange={e => handleEdit(p, "quantity", +e.target.value)}
                />
              </td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p.id)}>Elimina</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
