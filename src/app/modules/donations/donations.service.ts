import { DonationStatus, IDonation } from "./donations.interface";
import { DonationRepository } from "./donations.repository";

export const DonationService = {
  createDonation: async (payload: IDonation) => {
    return DonationRepository.createDonation({
      ...payload,
      status: DonationStatus.PENDING,
    });
  },
};