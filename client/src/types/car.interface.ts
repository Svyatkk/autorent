import type { IBooking } from "./booking.interface";
import type { ICarBrand } from "./carBrand.interface";
import type { ICarModel } from "./carModel.interface";

export interface ICar {
    age_restriction: number | null;
    aiport_charge: string | null;
    attribute_0_100: string | null;
    attribute_doors: number | null;
    attribute_engine: string | null;
    attribute_engine_type: number;
    attribute_horsepower: string | null;
    attribute_lg_bag: number;
    attribute_max_speed: string | null;
    attribute_mileage: string | null;
    attribute_number_of_seats: string | null;
    attribute_sm_bag: number;
    attribute_tinted: string | null;
    attribute_transmission: string | null;
    attribute_year: string | null;
    car_body_id: number | null;
    car_id: number;
    car_model_id: number | null;
    car_serie_id: number | null;
    city_id: number;
    company_id: number | null;
    complete: number;
    created_at: string;
    currency: string | null;

    deleted_at: string | null;
    deposit: number | null;
    driving_licence_restriction: number | null;
    engine_suspention_condition: number;
    exterior_condition: number;
    features: string | null;
    free_delivery_dubai: number;
    from_carsss: number;
    holiday_calculator_id: number | null;
    insurance: string;
    insurance_amount: number;
    insurance_cdw: string | null;
    insurance_cdw_desc: string | null;
    insurance_default: string | null;
    insurance_default_desc: string | null;
    interior_condition: number;
    in_abu_dhabi: number;
    is_deleted: number;
    km_included_per_day: string | null;
    km_included_per_month: string | null;
    latitude: string | null;
    longitude: string | null;
    message_color: string | null;
    message_text: string | null;
    message_title: string | null;
    min_day_reservation: number | null;

    no_deposit_needed: number;
    overlimit_charge: number | null;
    photo: string | null;
    price_1: number | null;
    price_2: number;
    price_3_6: number;
    price_7_13: number | null;
    price_14_20: number;
    price_21_29: number;
    price_30_more: number | null;
    price_partner_1: number;
    price_partner_2: number;
    price_partner_3_6: number;
    price_partner_7_13: number;
    price_partner_14_20: number;
    price_partner_21_29: number;
    price_partner_30_more: number;
    price_type: string;
    range_calculator_id: number | null;
    registration_number: string | null;
    sales_tax_id: number | null;
    salik: number | null;
    sort_time: string | null;
    status: number;
    updated_at: string | null;
    was_migrated: number;
    was_migrated_at: string;
    with_owner: number;
    youtube_video_link: string | null;


    bookings: IBooking[]
    car_model: ICarModel,
    car_brand: ICarBrand

}