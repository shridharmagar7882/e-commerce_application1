import { Button, Card } from "react-bootstrap";

export default function ProductCard({ product, addToCart }) {
  // Safe fallback if product object is missing properties
  const { name = "Product Name", price = 0, image = "/image/placeholder.png" } = product || {};

  return (
    <Card className="h-100 shadow-sm border-0">
      <Card.Img 
        variant="top" 
        src={image} 
        alt={name} 
        style={{ height: "200px", objectFit: "cover" }} 
      />

      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <Card.Title className="fs-6 fw-bold mb-1">{name}</Card.Title>
          <Card.Subtitle className="mb-3 text-success fw-bold">
            ${Number(price).toFixed(2)}
          </Card.Subtitle>
        </div>

        <Button 
          variant="primary" 
          size="sm" 
          className="w-100"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
}