"use client";

import { PrintIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { BUSINESS_SETTINGS, DEMO_TODAY } from "@/constants/settings";
import {
  formatMoney,
  formatPercent,
  formatWeekdayDate,
  parseDayMonthYear,
} from "@/lib/format";
import { formatLunarLong, solarToLunar } from "@/lib/lunar";
import { moneyInWords } from "@/lib/moneyWords";
import { CUSTOMER, type Contract } from "@/mocks/contracts";
import { useDemoState } from "@/mocks/demoStore";

const BLANK = "……………………………………";

const fill = (value: string) => value || BLANK;

const percent = (rate: number) => formatPercent(rate, 0);

/**
 * Printable service contract laid out the way Vietnamese contracts are
 * expected to read: national motto, legal bases, the two parties, numbered
 * articles, then both signatures. The browser's "Save as PDF" is the export.
 */
export function ContractDocument({ contract }: { contract: Contract }) {
  const signature = useDemoState((state) => state.contractSignature);
  const legal = siteConfig.legal;
  const deposit = contract.total * BUSINESS_SETTINGS.minimumDepositRate;

  return (
    <div className="contract-doc-shell">
      <div className="contract-doc-toolbar" data-print="hide">
        <span>
          Bản hợp đồng {contract.number}. Chọn “Lưu dưới dạng PDF” trong hộp
          thoại in để gửi khách qua Zalo hoặc email.
        </span>
        <Button variant="primary" onClick={() => window.print()}>
          <PrintIcon size={18} />
          In hoặc lưu PDF
        </Button>
      </div>

      <article className="contract-doc">
        <header className="contract-doc-motto">
          <b>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</b>
          <b className="contract-doc-motto-sub">Độc lập – Tự do – Hạnh phúc</b>
          <span className="contract-doc-rule" />
        </header>

        <h1 className="contract-doc-title">
          HỢP ĐỒNG CUNG CẤP DỊCH VỤ NẤU TIỆC LƯU ĐỘNG
        </h1>
        <p className="contract-doc-number">Số: {contract.number}</p>

        <ul className="contract-doc-bases">
          <li>Căn cứ Bộ luật Dân sự số 91/2015/QH13 ngày 24/11/2015;</li>
          <li>Căn cứ Luật Thương mại số 36/2005/QH11 ngày 14/6/2005;</li>
          <li>
            Căn cứ Luật Bảo vệ quyền lợi người tiêu dùng số 19/2023/QH15 ngày
            20/6/2023;
          </li>
          <li>Căn cứ Luật An toàn thực phẩm số 55/2010/QH12 ngày 17/6/2010;</li>
          <li>
            Căn cứ Luật Giao dịch điện tử số 20/2023/QH15 ngày 22/6/2023 đối với
            việc xác nhận hợp đồng trực tuyến;
          </li>
          <li>Căn cứ nhu cầu và khả năng của hai bên.</li>
        </ul>

        <p>
          Hôm nay, ngày {DEMO_TODAY.getDate()} tháng {DEMO_TODAY.getMonth() + 1}{" "}
          năm {DEMO_TODAY.getFullYear()}, tại {legal.signingPlace}, chúng tôi
          gồm:
        </p>

        <section className="contract-doc-party">
          <h2>BÊN A (BÊN SỬ DỤNG DỊCH VỤ)</h2>
          <dl>
            <dt>Họ và tên</dt>
            <dd>{CUSTOMER.name}</dd>
            <dt>Số CCCD</dt>
            <dd>{BLANK}</dd>
            <dt>Địa chỉ</dt>
            <dd>{BLANK}</dd>
            <dt>Điện thoại</dt>
            <dd>{CUSTOMER.phone}</dd>
          </dl>
        </section>

        <section className="contract-doc-party">
          <h2>BÊN B (BÊN CUNG CẤP DỊCH VỤ)</h2>
          <dl>
            <dt>Tên cơ sở</dt>
            <dd>{legal.name}</dd>
            <dt>Địa chỉ</dt>
            <dd>{fill(legal.address)}</dd>
            <dt>Mã số thuế</dt>
            <dd>{fill(legal.taxCode)}</dd>
            <dt>Đại diện</dt>
            <dd>
              {fill(legal.representative)} – Chức vụ:{" "}
              {legal.representativeTitle}
            </dd>
            <dt>Điện thoại</dt>
            <dd>{siteConfig.phone}</dd>
            <dt>Tài khoản</dt>
            <dd>{fill(legal.bankAccount)}</dd>
          </dl>
        </section>

        <p>
          Hai bên thống nhất ký kết hợp đồng cung cấp dịch vụ nấu tiệc lưu động
          với các điều khoản sau:
        </p>

        <section className="contract-doc-article">
          <h2>Điều 1. Nội dung dịch vụ</h2>
          <p>
            Bên B nấu và phục vụ tiệc tại địa điểm do Bên A cung cấp, gồm{" "}
            {contract.meals.length} bữa tiệc như sau. Số bàn ăn là căn cứ tính
            tiền thực đơn; số bàn bố trí là số bàn đặt cùng lúc khi phục vụ cuốn
            chiếu theo lượt.
          </p>
          {contract.meals.map((meal, index) => {
            const date = parseDayMonthYear(meal.date);
            return (
              <div key={meal.name} className="contract-doc-meal">
                <h3>
                  1.{index + 1}. Bữa {index + 1}: {meal.name}
                </h3>
                <table>
                  <tbody>
                    <tr>
                      <th>Ngày tổ chức</th>
                      <td>
                        {date ? formatWeekdayDate(date) : meal.date}
                        {date
                          ? ` (âm lịch: ${formatLunarLong(solarToLunar(date))})`
                          : null}
                      </td>
                    </tr>
                    <tr>
                      <th>Thời gian, lượt đãi</th>
                      <td>
                        {meal.waves
                          .map(
                            (wave, waveIndex) =>
                              `Lượt ${waveIndex + 1}: ${wave.from}–${wave.to}, ${wave.tables} bàn`
                          )
                          .join("; ")}
                      </td>
                    </tr>
                    <tr>
                      <th>Địa điểm</th>
                      <td>{meal.address}</td>
                    </tr>
                    <tr>
                      <th>Quy mô</th>
                      <td>
                        {meal.servingTables} bàn ăn × {meal.guestsPerTable}{" "}
                        người/bàn; bố trí {meal.setupTables} bàn cùng lúc
                      </td>
                    </tr>
                    <tr>
                      <th>Thực đơn</th>
                      <td>
                        {meal.setName}: {meal.dishNames.join(", ")}
                      </td>
                    </tr>
                    <tr>
                      <th>Dịch vụ kèm theo</th>
                      <td>
                        {meal.services.length
                          ? meal.services
                              .map(
                                (service) =>
                                  `${service.name} (${service.quantity})`
                              )
                              .join(", ")
                          : "Không"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            );
          })}
        </section>

        <section className="contract-doc-article">
          <h2>Điều 2. Giá trị hợp đồng</h2>
          <table className="contract-doc-money">
            <thead>
              <tr>
                <th>Bữa</th>
                <th>Tiền món</th>
                <th>Dịch vụ</th>
                <th>Phụ thu</th>
                <th>Thuế</th>
                <th>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {contract.meals.map((meal, index) => (
                <tr key={meal.name}>
                  <td>Bữa {index + 1}</td>
                  <td>{formatMoney(meal.price.dishAmount)}</td>
                  <td>{formatMoney(meal.price.serviceAmount)}</td>
                  <td>{formatMoney(meal.price.surcharge)}</td>
                  <td>{formatMoney(meal.price.taxAmount)}</td>
                  <td>{formatMoney(meal.price.total)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={5}>Tổng giá trị hợp đồng</td>
                <td>{formatMoney(contract.total)}</td>
              </tr>
            </tfoot>
          </table>
          <p>
            <i>Bằng chữ: {moneyInWords(contract.total)}.</i>
          </p>
          <p>
            Giá trên đã gồm thuế giá trị gia tăng{" "}
            {percent(BUSINESS_SETTINGS.taxRate)} và được giữ cố định; Bên B
            không tự tăng giá khi giá nguyên liệu hoặc bảng giá thay đổi. Tổng
            mỗi bữa làm tròn tới bội số 500 đồng gần nhất.
          </p>
        </section>

        <section className="contract-doc-article">
          <h2>Điều 3. Đặt cọc và thanh toán</h2>
          <ol>
            <li>
              Trong {BUSINESS_SETTINGS.holdHours} giờ kể từ khi hợp đồng được
              phát hành, Bên A đặt cọc từ{" "}
              {percent(BUSINESS_SETTINGS.minimumDepositRate)} đến 100% giá trị
              hợp đồng, tối thiểu {formatMoney(deposit)} (
              {moneyInWords(deposit).toLowerCase()}), bằng tiền mặt, chuyển
              khoản hoặc thanh toán trực tuyến. Khoản cọc được xử lý theo Điều
              328 Bộ luật Dân sự.
            </li>
            <li>
              Quá thời hạn trên mà chưa xác nhận hợp đồng và chưa đủ cọc thì Bên
              B không còn giữ chỗ.
            </li>
            <li>
              Số tiền còn lại thanh toán khi quyết toán từng bữa, sau khi đối
              chiếu dụng cụ và các khoản bồi thường (nếu có). Không áp dụng mua
              chịu.
            </li>
          </ol>
        </section>

        <section className="contract-doc-article">
          <h2>Điều 4. Điều chỉnh trước ngày tiệc</h2>
          <ol>
            <li>Không dời ngày tổ chức đã thỏa thuận.</li>
            <li>
              Đổi món đã chọn khi còn ít nhất{" "}
              {BUSINESS_SETTINGS.dishChangeCutoffDays} ngày trước giờ bắt đầu
              bữa; không thêm món mới.
            </li>
            <li>
              Tăng, giảm bàn ăn khi còn ít nhất{" "}
              {BUSINESS_SETTINGS.tableChangeCutoffDays} ngày; giảm tối đa{" "}
              {percent(BUSINESS_SETTINGS.maxTableReductionRate)} số bàn ký ban
              đầu. Tăng trên {BUSINESS_SETTINGS.extraDepositTableThreshold} bàn
              trong một lần thì Bên A cọc bổ sung{" "}
              {percent(BUSINESS_SETTINGS.minimumDepositRate)} giá trị phần tăng.
            </li>
            <li>
              Mọi điều chỉnh lập thành phụ lục ghi rõ nội dung trước, sau và
              chênh lệch; phụ lục là bộ phận không tách rời của hợp đồng và chỉ
              có hiệu lực khi Bên A xác nhận và đã đủ cọc bổ sung (nếu có).
            </li>
          </ol>
        </section>

        <section className="contract-doc-article">
          <h2>Điều 5. Hủy bữa tiệc và hoàn tiền</h2>
          <p>
            Thời hạn tính từ lúc Bên B ghi nhận yêu cầu hủy đến giờ bắt đầu bữa.
            Tỷ lệ hoàn áp trên phần cọc bắt buộc của bữa; tiền trả trước vượt
            phần cọc này được hoàn đủ.
          </p>
          <table className="contract-doc-money">
            <thead>
              <tr>
                <th>Thời điểm hủy</th>
                <th>Hoàn phần cọc bắt buộc</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Chưa đặt cọc</td>
                <td>Hủy miễn phí</td>
              </tr>
              <tr>
                <td>Còn ít nhất 30 ngày</td>
                <td>100%</td>
              </tr>
              <tr>
                <td>Còn từ 15 đến dưới 30 ngày</td>
                <td>50%</td>
              </tr>
              <tr>
                <td>Còn dưới 15 ngày, sau giờ bắt đầu hoặc vắng mặt</td>
                <td>0%</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="contract-doc-article">
          <h2>Điều 6. Dụng cụ và bồi thường</h2>
          <p>
            Bên B mang dụng cụ phục vụ theo danh mục và đơn giá bồi thường đã
            thông báo. Sau tiệc hai bên đối chiếu số lượng; dụng cụ hư hỏng,
            thất lạc do Bên A chịu trách nhiệm được bồi thường theo đơn giá đã
            chốt. Hư hỏng do nhân viên Bên B gây ra không tính cho Bên A.
          </p>
        </section>

        <section className="contract-doc-article">
          <h2>Điều 7. Quyền và nghĩa vụ của Bên A</h2>
          <ol>
            <li>
              Chuẩn bị mặt bằng, điện, nước theo kết quả khảo sát; cử người liên
              hệ tại địa điểm.
            </li>
            <li>Thanh toán đúng hạn theo Điều 3.</li>
            <li>
              Được cung cấp đúng thực đơn, số lượng, thời gian đã thỏa thuận và
              được thông tin đầy đủ về giá, điều kiện hủy theo pháp luật bảo vệ
              quyền lợi người tiêu dùng.
            </li>
          </ol>
        </section>

        <section className="contract-doc-article">
          <h2>Điều 8. Quyền và nghĩa vụ của Bên B</h2>
          <ol>
            <li>
              Bảo đảm an toàn thực phẩm theo Luật An toàn thực phẩm: nguyên liệu
              rõ nguồn gốc, chế biến và vận chuyển hợp vệ sinh.
            </li>
            <li>
              Phục vụ đúng thời gian, đủ nhân sự theo quy mô và số lượt đãi của
              từng bữa.
            </li>
            <li>Được thanh toán đầy đủ, đúng hạn theo hợp đồng.</li>
          </ol>
        </section>

        <section className="contract-doc-article">
          <h2>Điều 9. Sự kiện bất khả kháng</h2>
          <p>
            Bên không thực hiện được nghĩa vụ do sự kiện bất khả kháng theo Điều
            156 Bộ luật Dân sự (thiên tai, dịch bệnh, quyết định của cơ quan nhà
            nước…) phải báo ngay cho bên kia; hai bên thỏa thuận dời, giảm hoặc
            chấm dứt phần dịch vụ bị ảnh hưởng mà không phải bồi thường.
          </p>
        </section>

        <section className="contract-doc-article">
          <h2>Điều 10. Giải quyết tranh chấp</h2>
          <p>
            Tranh chấp được giải quyết trước hết bằng thương lượng, hòa giải.
            Không thương lượng được thì một bên có quyền yêu cầu Tòa án nhân dân
            có thẩm quyền giải quyết theo quy định của pháp luật.
          </p>
        </section>

        <section className="contract-doc-article">
          <h2>Điều 11. Điều khoản chung</h2>
          <ol>
            <li>
              Hợp đồng có hiệu lực khi Bên A đã xác nhận (ký giấy hoặc xác nhận
              trực tuyến bằng tài khoản) và Bên B đã ghi nhận đủ cọc bắt buộc.
            </li>
            <li>
              Xác nhận trực tuyến có giá trị như bản ký giấy theo Luật Giao dịch
              điện tử.
            </li>
            <li>
              Hợp đồng lập thành 02 bản có giá trị pháp lý như nhau, mỗi bên giữ
              01 bản.
            </li>
          </ol>
        </section>

        <footer className="contract-doc-signatures">
          <div>
            <b>ĐẠI DIỆN BÊN A</b>
            <small>(Ký, ghi rõ họ tên)</small>
            {signature ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element -- a data URL from the signature pad */}
                <img
                  src={signature.image}
                  alt={`Chữ ký của ${signature.name}`}
                />
                <small>Đã ký trực tuyến lúc {signature.signedAt}</small>
              </>
            ) : (
              <span className="contract-doc-sign-space" />
            )}
            <b>{signature?.name ?? CUSTOMER.name}</b>
          </div>
          <div>
            <b>ĐẠI DIỆN BÊN B</b>
            <small>(Ký, ghi rõ họ tên, đóng dấu nếu có)</small>
            <span className="contract-doc-sign-space" />
            <b>{fill(legal.representative)}</b>
          </div>
        </footer>
      </article>
    </div>
  );
}
