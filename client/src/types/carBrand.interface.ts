import type { ICarBrandTranslation } from "./carBrandTranslation.interface";

export interface ICarBrand {
    car_brand_id: number;
    created_at: string;
    deleted_at: string | null;
    icon: string | null;
    is_deleted: number;
    slug: string | null;
    status: number;
    updated_at: string | null;
    youtube_video_link: string | null;
    translation?: ICarBrandTranslation;
}