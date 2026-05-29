select it.ITEM_ID, ii.ITEM_NAME
from ITEM_INFO ii join ITEM_TREE it on ii.item_id = it.item_id
where PARENT_ITEM_ID is null