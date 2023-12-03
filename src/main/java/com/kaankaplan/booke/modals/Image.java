package com.kaankaplan.booke.modals;

public class Image {
    private final String imageId;
    public String imageUrl;

    public Image(String imageId, String imageUrl) {
        this.imageId = imageId;
        this.imageUrl = imageUrl;
    }

    public String getImageId() {
        return imageId;
    }
}
