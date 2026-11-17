---
order: 30
---

# Service Availability Check

```mermaid
flowchart TD
    subgraph Consultant["Consultant"]
        Consultant1["Receive meals to check\n(dining tables, arranged tables and chairs, resource windows)"]
        Consultant3{"Valid time & resource windows?"}
        Consultant4["Confirm order acceptance / apply addendum"]
        Consultant5["Report shortage — not accepted"]
    end

    subgraph ResourceAvailabilityService["ResourceAvailabilityService"]
        ResourceCheck1["Calculate equipment demand\n(per person, arranged table, meal)"]
        ResourceCheck2["Exclude expired temporary reservations"]
        ResourceCheck3["Combine overlapping reservations + meals in current order"]
        ResourceCheck4{"Sufficient compared with usable owned stock?"}
        ResourceCheck5["Suggest staff: ceil(arranged tables / 3)"]
        ResourceCheck6["Sum expected demand by position\nWindow: meal start minus TS18 to meal end"]
        ResourceCheck7{"Sufficient staff capacity?"}
        ResourceCheck8["Stock < minimum → Warning (non-blocking)"]
        ResourceCheck9["Recheck & record reservation atomically"]
        ResourceCheck10["Also check actual ready quantity (at issue)"]
    end

    subgraph Data["Reservation / assignment / inventory data"]
        Data1[("Temporary & confirmed reservations")]
        Data2[("Staff assignments")]
        Data3[("Equipment inventory")]
    end

    Consultant1 --> Consultant3
    Consultant3 -- "Invalid" --> Consultant5
    Consultant3 -- "Valid" --> ResourceCheck1
    ResourceCheck1 --> ResourceCheck2
    ResourceCheck2 --> ResourceCheck3
    ResourceCheck3 --> Data1
    Data1 --> ResourceCheck4
    ResourceCheck4 -- "Actual shortage" --> Consultant5
    ResourceCheck4 -- "Sufficient" --> ResourceCheck8
    ResourceCheck8 --> ResourceCheck5
    ResourceCheck5 --> ResourceCheck6
    ResourceCheck6 --> Data2
    Data2 --> ResourceCheck7
    ResourceCheck7 -- "Insufficient" --> Consultant5
    ResourceCheck7 -- "Sufficient" --> Consultant4
    Consultant4 --> ResourceCheck9
    ResourceCheck9 --> Data1
    Consultant4 --> ResourceCheck10
    ResourceCheck10 --> Data3
```

<!-- diagram id="vitepress-plugin-digrams-flowchart-service-capacity" -->

## Scope

UC liên quan: UC-DT-04, UC-DT-05, UC-HD-05, UC-NS-02, UC-KHO-06. Tra tại [danh mục chung](../use-case-catalog.md).

## Notes and Constraints

- Không kiểm tra xe vận chuyển, thời tiết, giấy chứng nhận sức khỏe, lịch nghỉ phép cá nhân, API bản đồ tự động hoặc tồn kho nguyên liệu (chỉ kiểm tra dụng cụ và nhân sự).
- Không tự kiểm tra khoảng cách theo mốc tham khảo; tư vấn tự đánh giá địa điểm. Dụng cụ theo người được tính theo số bàn ăn × 10 suất chuẩn.
- Lượng giữ chỗ đã xuất kho thực tế không bị trừ hai lần vào năng lực khả dụng (tuân thủ bất biến tại [`domain-model.md`](../../models/domain-model.md)).
- Ngưỡng tồn tối thiểu chỉ đóng vai trò cảnh báo trên Dashboard; chỉ khi thiếu thực tế so với sở hữu khả dụng mới từ chối nhận đơn.
