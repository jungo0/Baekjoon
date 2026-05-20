select outs.animal_id, outs.name
from animal_outs outs
LEFT OUTER JOIN ANIMAL_INS ins
on outs.animal_id = ins.animal_id
where ins.animal_id is NULL
order by outs.animal_id;
