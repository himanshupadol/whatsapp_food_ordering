from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend import models, database
from backend.whatsapp_utils import send_whatsapp_message

api_router = APIRouter(prefix = "/orders",
                       tags = ["orders"])

# for placing order
@api_router.post("/")
def place_order(order: dict, db: Session = Depends(database.get_db)):

    # checking item availability
    items = db.query(models.MenuItem).filter(models.MenuItem.id.in_(order["items"]))
    if not items:
        raise HTTPException(status_code = 400,
                            detail = "Invalid or unavailable items")

    # converting list of item ids to string
    item_names = ",".join([item.name for item in items])

    new_order = models.Order(
        customer_name = order["customer_name"],
        whatsapp_number = order["whatsapp_number"],
        items = item_names,
        status = "pending")

    db.add(new_order)
    db.commit()
    db.refresh(new_order)

    message = f"Hi {new_order.customer_name}, your order ({item_names}) has been received. Status: {new_order.status}."
    send_whatsapp_message(new_order.whatsapp_number, message)

    return new_order

# for updating order status
@api_router.patch("/{order_id}")
def update_order_status(order_id: int, update: dict, db: Session = Depends(database.get_db)):
    order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code = 404,
                            detail = "Order not found")

    order.status = update["status"]
    db.commit()
    db.refresh(order)

    message = f"Your order {order.id} status is now: {order.status}."

    return {"message":"Order status updated", "order": order}

# listing all orders
@api_router.get("/")
def list_orders(db: Session = Depends(database.get_db)):
    return db.query(models.Order).all()

# search or get orders by order id
@api_router.get("/{order_id}")
def get_order(order_id: int, db: Session = Depends(database.get_db)):
    order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code = 404,
                            detail = "Order not found")
    return order

# for canceling the order
@api_router.delete("/{order_id}")
def cancel_order(order_id: int, db: Session = Depends(database.get_db)):
    order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code = 404,
                            detail = "Order not found")

    db.delete(order)
    db.commit()

    print(f"WhatsApp: Order {order_id} canceled message sent")

    return {"message": "Order canceled"}
