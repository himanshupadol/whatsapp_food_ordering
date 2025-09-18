from collections.abc import Mapping
from typing import (
    TYPE_CHECKING,
    Any,
    TypeVar,
    Union,
    cast,
)

from attrs import define as _attrs_define
from attrs import field as _attrs_field

from ..types import UNSET, Unset

if TYPE_CHECKING:
    from ..models.item_create import ItemCreate


T = TypeVar("T", bound="OrderCreate")


@_attrs_define
class OrderCreate:
    """
    Attributes:
        customer_name (str):
        whatsapp_number (str):
        items (list['ItemCreate']):
        total (int):
        status (Union[None, Unset, str]):  Default: 'pending'.
    """

    customer_name: str
    whatsapp_number: str
    items: list["ItemCreate"]
    total: int
    status: Union[None, Unset, str] = "pending"
    additional_properties: dict[str, Any] = _attrs_field(init=False, factory=dict)

    def to_dict(self) -> dict[str, Any]:
        customer_name = self.customer_name

        whatsapp_number = self.whatsapp_number

        items = []
        for items_item_data in self.items:
            items_item = items_item_data.to_dict()
            items.append(items_item)

        total = self.total

        status: Union[None, Unset, str]
        if isinstance(self.status, Unset):
            status = UNSET
        else:
            status = self.status

        field_dict: dict[str, Any] = {}
        field_dict.update(self.additional_properties)
        field_dict.update(
            {
                "customer_name": customer_name,
                "whatsapp_number": whatsapp_number,
                "items": items,
                "total": total,
            }
        )
        if status is not UNSET:
            field_dict["status"] = status

        return field_dict

    @classmethod
    def from_dict(cls: type[T], src_dict: Mapping[str, Any]) -> T:
        from ..models.item_create import ItemCreate

        d = dict(src_dict)
        customer_name = d.pop("customer_name")

        whatsapp_number = d.pop("whatsapp_number")

        items = []
        _items = d.pop("items")
        for items_item_data in _items:
            items_item = ItemCreate.from_dict(items_item_data)

            items.append(items_item)

        total = d.pop("total")

        def _parse_status(data: object) -> Union[None, Unset, str]:
            if data is None:
                return data
            if isinstance(data, Unset):
                return data
            return cast(Union[None, Unset, str], data)

        status = _parse_status(d.pop("status", UNSET))

        order_create = cls(
            customer_name=customer_name,
            whatsapp_number=whatsapp_number,
            items=items,
            total=total,
            status=status,
        )

        order_create.additional_properties = d
        return order_create

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
