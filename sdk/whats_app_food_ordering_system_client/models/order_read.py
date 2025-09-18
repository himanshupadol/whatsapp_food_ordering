import datetime
from collections.abc import Mapping
from typing import (
    TYPE_CHECKING,
    Any,
    TypeVar,
)

from attrs import define as _attrs_define
from attrs import field as _attrs_field
from dateutil.parser import isoparse

if TYPE_CHECKING:
    from ..models.item_read import ItemRead


T = TypeVar("T", bound="OrderRead")


@_attrs_define
class OrderRead:
    """
    Attributes:
        id (int):
        customer_name (str):
        whatsapp_number (str):
        items (list['ItemRead']):
        status (str):
        total (int):
        created_at (datetime.datetime):
    """

    id: int
    customer_name: str
    whatsapp_number: str
    items: list["ItemRead"]
    status: str
    total: int
    created_at: datetime.datetime
    additional_properties: dict[str, Any] = _attrs_field(init=False, factory=dict)

    def to_dict(self) -> dict[str, Any]:
        id = self.id

        customer_name = self.customer_name

        whatsapp_number = self.whatsapp_number

        items = []
        for items_item_data in self.items:
            items_item = items_item_data.to_dict()
            items.append(items_item)

        status = self.status

        total = self.total

        created_at = self.created_at.isoformat()

        field_dict: dict[str, Any] = {}
        field_dict.update(self.additional_properties)
        field_dict.update(
            {
                "id": id,
                "customer_name": customer_name,
                "whatsapp_number": whatsapp_number,
                "items": items,
                "status": status,
                "total": total,
                "created_at": created_at,
            }
        )

        return field_dict

    @classmethod
    def from_dict(cls: type[T], src_dict: Mapping[str, Any]) -> T:
        from ..models.item_read import ItemRead

        d = dict(src_dict)
        id = d.pop("id")

        customer_name = d.pop("customer_name")

        whatsapp_number = d.pop("whatsapp_number")

        items = []
        _items = d.pop("items")
        for items_item_data in _items:
            items_item = ItemRead.from_dict(items_item_data)

            items.append(items_item)

        status = d.pop("status")

        total = d.pop("total")

        created_at = isoparse(d.pop("created_at"))

        order_read = cls(
            id=id,
            customer_name=customer_name,
            whatsapp_number=whatsapp_number,
            items=items,
            status=status,
            total=total,
            created_at=created_at,
        )

        order_read.additional_properties = d
        return order_read

    @property
    def additional_keys(self) -> list[str]:
        return list(self.additional_properties.keys())

    def __getitem__(self, key: str) -> Any:
        return self.additional_properties[key]

    def __setitem__(self, key: str, value: Any) -> None:
        self.additional_properties[key] = value

    def __delitem__(self, key: str) -> None:
        del self.additional_properties[key]

    def __contains__(self, key: str) -> bool:
        return key in self.additional_properties
