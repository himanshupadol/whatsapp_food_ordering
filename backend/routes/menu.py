from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend import models, database

api_router = APIRouter(prefix = "/menu",
                       tags = ["menu"])

# for adding new menu items
@api_router.post("/")
def add_menu_item(item: dict, db: Session = Depends(database.get_db)):
    new_item = models.MenuItem(
        name = item["name"],
        description = item.get("description", ""),
        price = item["price"],
        available = item.get("available", True))
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item

@api_router.get("/")
def get_menu(db: Session = Depends(database.get_db)):
    return db.query(models.MenuItem).all()

@api_router.get("/{item_id}")
def get_menu_item(item_id: int, db: Session = Depends(database.get_db)):
    item = db.query(models.MenuItem).filter(models.MenuItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code = 404,
                            detail = "Item Not Found")
    return item

@api_router.put("/{item_id}")
def update_menu_item(item_id: int, name: str=None, price: float=None, db: Session = Depends(database.get_db)):
    item = db.query(models.MenuItem).filter(models.MenuItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail='Menu item not found')
    if name:
        item.name = name
    if price:
        item.price = price
    db.commit()
    db.refresh(item)
    return {"status": "success", "message": f"Menu item {item_id} updated", "item": item}

@api_router.patch("/{item_id}/availability")
def toggle_availability(item_id: int, available: bool, db: Session = Depends(database.get_db)):
    item = db.query(models.MenuItem).filter(models.MenuItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code = 404, detail = "Meni item not found")
    item.available = available
    db.commit()
    db.refresh(item)
    return {"status": "success", "message": f"Availability updated for item {item_id}", "item": item}
