## Forbidden dependency check - results

### :chart_with_upwards_trend: Summary

**341** modules&nbsp;&nbsp;&nbsp;&nbsp;**624** dependencies&nbsp;&nbsp;&nbsp;&nbsp;**3** errors&nbsp;&nbsp;&nbsp;&nbsp;**0** warnings&nbsp;&nbsp;&nbsp;&nbsp;**0** informational&nbsp;&nbsp;&nbsp;&nbsp;**0** ignored


|rule|violations|ignored|explanation
|:---|:---:|:---:|:---|
|:exclamation:&nbsp;_no-circular_|**3**|**0**|This dependency is part of a circular relationship.|


### :fire: All violations

<details><summary>Violations found - click to expand</summary>

|violated rule|module|to|
|:---|:---|:---|
|:exclamation:&nbsp;_no-circular_|libs/domains/accounting/domain/src/lib/entities/journal-entry-line.entity.ts|libs/domains/accounting/domain/src/lib/entities/journal-entry.entity.ts &rightarrow;<br/>libs/domains/accounting/domain/src/lib/entities/journal-entry-line.entity.ts|
|:exclamation:&nbsp;_no-circular_|libs/domains/inventory/domain/src/lib/entities/location.entity.ts|libs/domains/inventory/domain/src/lib/entities/warehouse.entity.ts &rightarrow;<br/>libs/domains/inventory/domain/src/lib/entities/location.entity.ts|
|:exclamation:&nbsp;_no-circular_|libs/domains/purchasing/domain/src/lib/entities/purchase-order-item.entity.ts|libs/domains/purchasing/domain/src/lib/entities/purchase-order.entity.ts &rightarrow;<br/>libs/domains/purchasing/domain/src/lib/entities/purchase-order-item.entity.ts|


</details>

---
[dependency-cruiser@17.3.7](https://www.github.com/sverweij/dependency-cruiser) / 2026-01-29T03:05:22.870Z
