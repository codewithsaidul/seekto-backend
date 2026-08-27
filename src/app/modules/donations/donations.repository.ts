import { IDonation } from "./donations.interface";
import { Donation } from "./donations.model";

export const DonationRepository = {
  createDonation: async (data: Partial<IDonation>) => {
    return Donation.create(data);
  },

  findDonationById: async (donationId: string) => {
    return Donation.findById(donationId);
  },

  updateDonationStatus: async (
    donationId: string,
    status: string,
  ) => {
    return Donation.findByIdAndUpdate(
      donationId,
      { status },
      { new: true },
    );
  },
};