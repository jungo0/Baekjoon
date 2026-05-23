select distinct
    APNT_NO,
    PT_NAME,
    p.PT_NO,
    a.MCDP_CD,
    DR_NAME,
    APNT_YMD
from PATIENT p
join APPOINTMENT a on p.PT_NO = a.PT_NO
join DOCTOR d on a.MDDR_ID = d.DR_ID
where  a.MCDP_CD = 'CS'
and APNT_CNCL_YN = 'N'
and date_format(APNT_YMD, '%Y-%m-%d') = '2022-04-13'
order by APNT_YMD;